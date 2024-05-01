export const arrangeData = (data) => {
   
  
    const groupedData = data.reduce((acc, curr) => {
      const existingItem = acc.find((item) => item.invoice_id === curr.invoice_id);
      if (existingItem) {
        existingItem.charges.push({
          charge_date: curr.charge_date,
          total: curr.total,
          doctor_full_name: curr.doctor_full_name,
          title: curr.title,
          price:curr.price,
          amount:curr.amount,
           status:curr.status
        });
      } else {
        acc.push({
          invoice_id: curr.invoice_id,
          invoice_date: curr.invoice_date,
          admission_id: curr.admission_id,
          patient_full_name: curr.patient_full_name,
          invoice_total: curr.invoice_total,
          doctor_full_name: curr.doctor_full_name,
          status:curr.status,
          charges: [
            {
              charge_date: curr.charge_date,
              total: curr.total,
              title: curr.title,
              price:curr.price,
              amount:curr.amount,

            },
          ],
        });
      }
      return acc;
    }, []);
   

  
    return groupedData;
  };
  