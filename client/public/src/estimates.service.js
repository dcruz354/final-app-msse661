const ESTIMATES_API = `${BASE_API_URL}/estimates`; // http://localhost:3000/api/estimates

const getEstimates = () => _get(ESTIMATES_API, OPTIONS_WITH_AUTH);

const addEstimate = (formData) =>
    _post(ESTIMATES_API, formData, DEFAULT_OPTIONS_WITH_AUTH);

const deleteEstimate = (estimateId) =>
    _delete(`${ESTIMATES_API}/${estimateId}`, OPTIONS_WITH_AUTH);
