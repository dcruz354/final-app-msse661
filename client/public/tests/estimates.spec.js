const estimate = new Estimates();
describe('Estimates App', () => {
    xit('should add an order', async() => {
        const newEstimate = {
            estimate_id: 1,
            job_number: 1,
            pipe_size: 1,
            total_num_holes: 500,
            total_savings: 200
        };
        
        await estimate.generateEstimates(newEstimate);

        expect(estimate.estimates.length).toBe(1);
    });
});