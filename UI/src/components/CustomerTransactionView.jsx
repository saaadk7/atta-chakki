import React, { useState } from "react";
import CustomerList from "./CustomerList2";
import TransactionList from "./TransactionList";

const CustomerTransactionView = () => {
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 h-full">
      <div className="w-full md:w-1/3">
        <CustomerList
          onSelectCustomer={setSelectedCustomerId}
          selectedCustomerId={selectedCustomerId}
        />
      </div>

      <div className="w-full md:w-2/3">
        <TransactionList customerId={selectedCustomerId} />
      </div>
    </div>
  );
};

export default CustomerTransactionView;
