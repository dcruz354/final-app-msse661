/**
 * AJAX add new estimates to estimate list on save.
 */
const doAddEstimate = async (e) => {
    e.preventDefault();
  
    const estimateInput = document.getElementById('formInputJobNumber');
    const job_number = estimateInput.value;
    const pipeSizeSelect = document.getElementById('formSelectPipeSize');
    const selectedIndex = pipeSizeSelect.selectedIndex;
    var pipe_size;
    var total_savings;
    const estimateInput1 = document.getElementById('formInputTotalNumHoles');
    const total_num_holes = estimateInput1.value;
    if(selectedIndex === 0)
    {
      pipe_size = 2;
      total_savings = (4.60 * total_num_holes) - (4.50 * total_num_holes);
    } else
    {
      pipe_size = 3;
      total_savings = (9.40 * total_num_holes) - (6.50 * total_num_holes);
    }
  
    if (!job_number) {
      alert('Please enter a job number.');
      return;
    }
    if (!total_num_holes) {
        alert('Please enter number of holes.');
        return;
      }
      console.log(total_savings);
    const res = await addEstimate({ job_number, pipe_size, total_num_holes, total_savings});
  
    if (res !== null) {
      inst.generateEstimates();
    }
    estimateInput.value = '';
    estimateInput1.value = '';
  };
  