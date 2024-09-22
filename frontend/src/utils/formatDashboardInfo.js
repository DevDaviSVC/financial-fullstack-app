import React, { useEffect, useState } from 'react'
import { useDashboardContext } from '../contexts/dashboardContext'

export default function formatDashboardInfo() {
  const {dashboard} = useDashboardContext();
  const [profit, setProfit] = useState(0);
  const [debit, setDebit] = useState(0);
  let balance = profit - debit;

  useEffect(() => {
    if (dashboard) {
      const itemsArr = dashboard.items;
      setProfit(itemsArr.reduce((accum, item) => item.type === "profit" ? accum + item.value : accum, 0));
      setDebit(itemsArr.reduce((accum, item) => item.type === "debit" ? accum + item.value : accum, 0));
    }
  }, [dashboard]);

  return {profit: formatInfo(profit), debit: formatInfo(debit), balance: formatInfo(balance)};
}

function formatInfo (info) {
  let formatedInfo;
  if (info < 0) {
    formatedInfo = "-R$" + -info.toFixed(2);
  } else {
    formatedInfo = "R$" + info.toFixed(2);
  }

  return formatedInfo;
}