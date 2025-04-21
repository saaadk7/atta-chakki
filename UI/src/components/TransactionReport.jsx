
import React, { useState, useEffect } from "react";
import api from "../services/api";
import jsPDF from "jspdf";
import "jspdf-autotable";

const TransactionReport = () => {
  const [transactions, setTransactions] = useState([]);
  const [notification, setNotification] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [flourSummary, setFlourSummary] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(0);

  useEffect(() => {
    const fetchTransactions = async () => {
      setIsLoading(true);
      try {
        const res = await api.getAllTransactions();
        setTransactions(res.data);
        calculateSummaries(res.data);
      } catch (error) {
        showNotification("Failed to fetch transactions", "error");
      } finally {
        setIsLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const calculateSummaries = (transactions) => {
    const flourSummary = {};
    const weeklyData = {};
    
    transactions.forEach(txn => {
      const date = new Date(txn.inTime || txn.outTime || new Date());
      const weekNumber = getWeekNumber(date);
      
      // Flour type summary
      if (!flourSummary[txn.flourType]) {
        flourSummary[txn.flourType] = {
          quantity: 0,
          totalAmount: 0,
          revenue: 0,
          electricityUnits: 0
        };
      }
      const transactionAmount = parseFloat(txn.quantity) * parseFloat(txn.unitPrice);
      const transactionRevenue = transactionAmount * 0.3; // 30% of total amount
      flourSummary[txn.flourType].quantity += parseFloat(txn.quantity);
      flourSummary[txn.flourType].totalAmount += transactionAmount;
      flourSummary[txn.flourType].revenue += transactionRevenue;
      flourSummary[txn.flourType].electricityUnits += Math.floor(parseFloat(txn.quantity) / 5);
      
      // Weekly summary
      if (!weeklyData[weekNumber]) {
        weeklyData[weekNumber] = {
          weekNumber,
          startDate: getStartOfWeek(date),
          endDate: getEndOfWeek(date),
          transactions: [],
          totalQuantity: 0,
          totalAmount: 0,
          revenue: 0,
          totalElectricity: 0
        };
      }
      weeklyData[weekNumber].transactions.push(txn);
      weeklyData[weekNumber].totalQuantity += parseFloat(txn.quantity);
      weeklyData[weekNumber].totalAmount += transactionAmount;
      weeklyData[weekNumber].revenue += transactionRevenue;
      weeklyData[weekNumber].totalElectricity += Math.floor(parseFloat(txn.quantity) / 5);
    });

    setFlourSummary(Object.keys(flourSummary).map(flourType => ({
      flourType,
      quantity: flourSummary[flourType].quantity,
      totalAmount: flourSummary[flourType].totalAmount,
      revenue: flourSummary[flourType].revenue,
      electricityUnits: flourSummary[flourType].electricityUnits
    })));

    const weeks = Object.values(weeklyData).sort((a, b) => b.weekNumber - a.weekNumber);
    setWeeklySummary(weeks);
    if (weeks.length > 0) {
      setCurrentWeek(weeks[0].weekNumber);
    }
  };

  const getWeekNumber = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 3 - (d.getDay() + 6) % 7);
    const week1 = new Date(d.getFullYear(), 0, 4);
    return 1 + Math.round(((d - week1) / 86400000 - 3 + (week1.getDay() + 6) % 7) / 7);
  };

  const getStartOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  const getEndOfWeek = (date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() + (day === 0 ? 0 : 7 - day);
    return new Date(d.setDate(diff));
  };

  const showNotification = (message, type = "success") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    return date.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric"
    });
  };

  const formatCurrency = (amount) => {
    if (amount === undefined || amount === null) return "₹ 0";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  const handleDownloadWeeklyPDF = (week) => {
    const doc = new jsPDF();
    
    // Title
    doc.setFontSize(18);
    doc.text(`Weekly Transactions Report - Week ${week.weekNumber}`, 14, 15);
    doc.setFontSize(12);
    doc.text(`Period: ${formatDate(week.startDate)} to ${formatDate(week.endDate)}`, 14, 22);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 29);
    
    // Weekly summary
    doc.autoTable({
      startY: 40,
      head: [["Metric", "Value"]],
      body: [
        ["Total Quantity Processed", `${week.totalQuantity} kg`],
        ["Total Amount", formatCurrency(week.totalAmount)],
        ["Revenue (30% of amount)", formatCurrency(week.revenue)],
        ["Total Electricity Units", `${week.totalElectricity} units (5kg = 1 unit)`]
      ],
      styles: { fontSize: 12 },
      headStyles: { fillColor: [40, 40, 40] }
    });

    // Transactions table
    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [[ "Flour Type", "Date", "Qty (kg)", "Unit Price", "Amount", "Revenue (30%)"]],
      body: week.transactions.map(txn => [
        // txn.id,
        // txn.customerName,
        txn.flourType,
        formatDateTime(txn.inTime || txn.outTime),
        txn.quantity,
        formatCurrency(txn.unitPrice),
        formatCurrency(txn.unitPrice * txn.quantity),
        formatCurrency(txn.unitPrice * txn.quantity * 0.3)
      ]),
      styles: { fontSize: 8 },
      headStyles: { fillColor: [70, 70, 70] }
    });

    // Flour type summary
    const flourSummaryForWeek = {};
    week.transactions.forEach(txn => {
      if (!flourSummaryForWeek[txn.flourType]) {
        flourSummaryForWeek[txn.flourType] = {
          quantity: 0,
          amount: 0,
          revenue: 0,
          electricityUnits: 0
        };
      }
      const transactionAmount = parseFloat(txn.quantity) * parseFloat(txn.unitPrice);
      const transactionRevenue = transactionAmount * 0.3;
      flourSummaryForWeek[txn.flourType].quantity += parseFloat(txn.quantity);
      flourSummaryForWeek[txn.flourType].amount += transactionAmount;
      flourSummaryForWeek[txn.flourType].revenue += transactionRevenue;
      flourSummaryForWeek[txn.flourType].electricityUnits += Math.floor(parseFloat(txn.quantity) / 5);
    });

    doc.autoTable({
      startY: doc.lastAutoTable.finalY + 15,
      head: [["Flour Type", "Qty (kg)", "Amount", "Revenue (30%)", "Electricity Units"]],
      body: Object.keys(flourSummaryForWeek).map(flourType => [
        flourType,
        flourSummaryForWeek[flourType].quantity,
        formatCurrency(flourSummaryForWeek[flourType].amount),
        formatCurrency(flourSummaryForWeek[flourType].revenue),
        flourSummaryForWeek[flourType].electricityUnits
      ]),
      styles: { fontSize: 10 },
      headStyles: { fillColor: [100, 100, 100] }
    });

    doc.save(`Weekly-Report-Week-${week.weekNumber}-${formatDate(week.startDate)}-to-${formatDate(week.endDate)}.pdf`);
  };

  if (isLoading) {
    return (
      <div className="w-full md:w-2/3 p-4 bg-white rounded-lg shadow">
        <p className="text-gray-500">Loading transactions...</p>
      </div>
    );
  }

  const selectedWeek = weeklySummary.find(w => w.weekNumber === currentWeek) || {};

  return (
    <div className="w-full p-4 bg-white rounded-lg shadow overflow-auto">
      {notification && (
        <div
          className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
            notification.type === "error"
              ? "bg-red-100 text-red-800"
              : "bg-green-100 text-green-800"
          }`}
        >
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Weekly Transactions</h2>
        {weeklySummary.length > 0 && (
          <div className="flex items-center gap-4">
            <select 
              value={currentWeek}
              onChange={(e) => setCurrentWeek(Number(e.target.value))}
              className="border p-2 rounded"
            >
              {weeklySummary.map(week => (
                <option key={week.weekNumber} value={week.weekNumber}>
                  Week {week.weekNumber} ({formatDate(week.startDate)} - {formatDate(week.endDate)})
                </option>
              ))}
            </select>
            <button
              onClick={() => handleDownloadWeeklyPDF(selectedWeek)}
              className="bg-green-900 text-white px-4 py-2 rounded hover:bg-green-800"
            >
              Download Weekly Report
            </button>
          </div>
        )}
      </div>

      {weeklySummary.length > 0 && (
        <div className="mb-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-semibold mb-2">
            Week {selectedWeek.weekNumber} Summary ({formatDate(selectedWeek.startDate)} - {formatDate(selectedWeek.endDate)})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-medium text-gray-500">Total Quantity</h4>
              <p className="text-2xl font-bold">{selectedWeek.totalQuantity} kg</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-medium text-gray-500">Total Amount</h4>
              <p className="text-2xl font-bold">{formatCurrency(selectedWeek.totalAmount)}</p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-medium text-gray-500">Revenue (30%)</h4>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(selectedWeek.revenue)}
              </p>
            </div>
            <div className="bg-white p-4 rounded shadow">
              <h4 className="font-medium text-gray-500">Electricity Used</h4>
              <p className="text-2xl font-bold">{selectedWeek.totalElectricity} units</p>
              <p className="text-sm text-gray-500">(5kg = 1 unit)</p>
            </div>
          </div>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm text-left text-gray-700">
              <thead className="bg-gray-100 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3">Flour Type</th>
                  <th className="px-4 py-3">Date/Time</th>
                  <th className="px-4 py-3">Quantity (kg)</th>
                  <th className="px-4 py-3">Unit Price</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Revenue (30%)</th>
                </tr>
              </thead>
              <tbody>
                {selectedWeek.transactions.map((txn) => (
                  <tr key={txn.id} className="border-b">
                    <td className="px-4 py-3">{txn.flourType}</td>
                    <td className="px-4 py-3">{formatDateTime(txn.inTime || txn.outTime)}</td>
                    <td className="px-4 py-3">{txn.quantity}</td>
                    <td className="px-4 py-3">{formatCurrency(txn.unitPrice)}</td>
                    <td className="px-4 py-3">{formatCurrency(txn.unitPrice * txn.quantity)}</td>
                    <td className="px-4 py-3 text-green-600">
                      {formatCurrency(txn.unitPrice * txn.quantity * 0.3)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-8">
            <h3 className="text-lg font-semibold mb-4">Flour Type Summary (Week {selectedWeek.weekNumber})</h3>
            <table className="min-w-full bg-white border">
              <thead className="bg-gray-100">
                <tr>
                  <th className="py-2 px-4 border">Flour Type</th>
                  <th className="py-2 px-4 border">Quantity (kg)</th>
                  <th className="py-2 px-4 border">Total Amount</th>
                  <th className="py-2 px-4 border">Revenue (30%)</th>
                  <th className="py-2 px-4 border">Electricity Units</th>
                </tr>
              </thead>
              <tbody>
                {flourSummary
                  .filter(item => 
                    selectedWeek.transactions.some(txn => txn.flourType === item.flourType)
                  )
                  .map((item, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border">{item.flourType}</td>
                      <td className="py-2 px-4 border">{item.quantity}</td>
                      <td className="py-2 px-4 border">{formatCurrency(item.totalAmount)}</td>
                      <td className="py-2 px-4 border text-green-600">{formatCurrency(item.revenue)}</td>
                      <td className="py-2 px-4 border">{item.electricityUnits}</td>
                    </tr>
                  ))}
                <tr className="font-bold">
                  <td className="py-2 px-4 border">Week Total</td>
                  <td className="py-2 px-4 border">{selectedWeek.totalQuantity}</td>
                  <td className="py-2 px-4 border">{formatCurrency(selectedWeek.totalAmount)}</td>
                  <td className="py-2 px-4 border text-green-600">{formatCurrency(selectedWeek.revenue)}</td>
                  <td className="py-2 px-4 border">{selectedWeek.totalElectricity}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <div className="mt-8">
        <h3 className="text-lg font-semibold mb-4">All-Time Flour Summary</h3>
        <table className="min-w-full bg-white border">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 border">Flour Type</th>
              <th className="py-2 px-4 border">Total Quantity (kg)</th>
              <th className="py-2 px-4 border">Total Amount</th>
              <th className="py-2 px-4 border">Revenue (30%)</th>
              <th className="py-2 px-4 border">Total Electricity Units</th>
            </tr>
          </thead>
          <tbody>
            {flourSummary.map((item, index) => (
              <tr key={index}>
                <td className="py-2 px-4 border">{item.flourType}</td>
                <td className="py-2 px-4 border">{item.quantity}</td>
                <td className="py-2 px-4 border">{formatCurrency(item.totalAmount)}</td>
                <td className="py-2 px-4 border text-green-600">{formatCurrency(item.revenue)}</td>
                <td className="py-2 px-4 border">{item.electricityUnits}</td>
              </tr>
            ))}
            <tr className="font-bold">
              <td className="py-2 px-4 border">Grand Total</td>
              <td className="py-2 px-4 border">
                {flourSummary.reduce((sum, item) => sum + item.quantity, 0)}
              </td>
              <td className="py-2 px-4 border">
                {formatCurrency(flourSummary.reduce((sum, item) => sum + item.totalAmount, 0))}
              </td>
              <td className="py-2 px-4 border text-green-600">
                {formatCurrency(flourSummary.reduce((sum, item) => sum + item.revenue, 0))}
              </td>
              <td className="py-2 px-4 border">
                {flourSummary.reduce((sum, item) => sum + item.electricityUnits, 0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionReport;