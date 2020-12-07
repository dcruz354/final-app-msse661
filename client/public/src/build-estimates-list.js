/**
 * @class Estimates
 *
 * Creates a list of estimates and updates a list
 */

class Estimates {
  estimates = [];

  constructor() {}

  /**
   * Build estimates list parent.
   * Uses bootstrap classes with some custom overrides.
   */
  createEstimateListParent = () => {
    const ul = document.createElement('ul');
    ul.id = 'estimates-list';
    ul.className = 'list-group list-group-flush checked-list-box';
    return ul;
  };

  _deleteEventHandler = (estimateId) => async () => {
    if (estimateId) {
      const res = await deleteEstimate(estimateId);

      if (res !== null) {
        this.estimates = this.estimates.filter((estimate) => estiamte.estiamte_id !== estimateId);
        const estimate = document.getElementById(`estimate-${estimateId}`);
        estimate.remove();

        if (!this.estimates.length) {
          const div = document.getElementById('estimates');
          const loadingDiv = div.childNodes[1];
          const errDiv = this.generateErrorMsg('Create some new estimates!');
          div.replaceChild(errDiv, loadingDiv);
        }
      }
    }
  };

  /**
   * Builds the list item.
   * Uses bootstrap classes with some custom overrides.
   *
   * {@link https://getbootstrap.com/docs/4.4/components/list-group/}
   * @example
   * <li class="list-group-item">
   *   <button class="btn btn-secondary" onclick="deleteEstimate(e, index)">X</button>
   *   <span>Job Number</span>
   *   <span>Pipe Size</span>
   *   <span>Total number of holes</span>
   * </li>
   */
  buildEstimateListRowItem = (estimate) => {
    const listGroupItem = document.createElement('li');
    listGroupItem.id = `estimate-${estiamte.estiamte_id}`; // estimate-1
    listGroupItem.className = 'list-group-item';

    const deleteBtn = document.createElement('button');
    const deleteBtnTxt = document.createTextNode('X');
    deleteBtn.className = 'btn btn-secondary';
    deleteBtn.addEventListener('click', this._deleteEventHandler(estimate.estiamte_id));
    deleteBtn.appendChild(deleteBtnTxt);

    const estimateJobNumberSpan = document.createElement('span');
    const jobNumber = document.createTextNode(estimate.job_number);
    estimateJobNumberSpan.appendChild(jobNumber);

    const estimatePipeSizeSpan = document.createElement('span');
    const pipeSize = document.createTextNode(estimate.pipe_size);
    estimatePipeSizeSpan.append(pipeSize);

    const estimateTotalNumHolesSpan = document.createElement('span');
    const estimateTotalNumHoles = document.createTextNode(estimate.total_num_holes);
    estimateTotalNumHolesSpan.append(estimateTotalNumHoles);

    // add list item's details
    listGroupItem.append(deleteBtn);
    listGroupItem.append(estimateJobNumberSpan);
    listGroupItem.append(estimatePipeSizeSpan);
    listGroupItem.append(estimateTotalNumHolesSpan);

    return listGroupItem;
  };

  /**
   * Assembles the list items then mounts them to a parent node.
   * Uses bootstrap classes with some custom overrides.
   */
  buildEstimatesList = (mount, estimates) =>
    estimates.map((estiamte) => {
      const listGroupRowItem = this.buildEstimateListRowItem(estimate);

      // add entire list item
      mount.append(listGroupRowItem);
    });

  generateErrorMsg = (msg) => {
    const div = document.createElement('div');
    const text = document.createTextNode(msg);
    div.id = 'user-message';
    div.className = 'center';
    div.appendChild(text);
    return div;
  };

  generateEstimates = async () => {
    const res = await getEstimates();
    const div = document.getElementById('estimates');
    const loadingDiv = div.childNodes[1];

    if (res.length) {
      this.estimates = res;
      const estimatesDiv = this.createEstimateListParent();
      this.buildEstimatesList(estimatesDiv, res);
      div.replaceChild(estimatesDiv, loadingDiv);
    } else {
      const errDiv = this.generateErrorMsg(res.msg);
      div.replaceChild(errDiv, loadingDiv);
    }
  };
}

const inst = new Estimates();

// This is an IIFE (Immediately Invoked Function Expression).
(async () => {
  inst.generateEstimates();
})();
