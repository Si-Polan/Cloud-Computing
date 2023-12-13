// violationController.js
const violationController = {
    latestViolations: async (req, res) => {
      try {
        // Implement logic to fetch the latest violations from the database
        // You may use models and queries depending on your setup
  
        // Sample response for demonstration purposes
        const latestViolations = [
          {
            id: 1,
            location: 'Jalan Kaliurang',
            type: 'Tidak memakai helm',
            vehicleNumberPlate: 'DK 2938 ACL',
            timestamp: '2023-03-01 (14:45:30)',
          },
          // Add more violations as needed
        ];
  
        const response = {
          code: '200',
          status: 'OK',
          message: 'Successfully fetched the latest violations',
          data: { violations: latestViolations },
        };
  
        res.json(response);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    userViolations: async (req, res) => {
      try {
        // Implement logic to fetch user violations from the database
        // You may use models and queries depending on your setup
  
        // Sample response for demonstration purposes
        const userViolations = [
          {
            id: 1,
            location: 'Jalan Kaliurang',
            type: 'Tidak memakai helm',
            vehicleNumberPlate: 'DK 2938 ACL',
            timestamp: '2023-03-01 (14:45:30)',
          },
          // Add more violations as needed
        ];
  
        const response = {
          code: '200',
          status: 'OK',
          message: 'User violations retrieved successfully',
          data: { violations: userViolations },
        };
  
        res.json(response);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  
    violationDetail: async (req, res) => {
      try {
        const violationId = req.params.violationId;
  
        // Implement logic to fetch violation details from the database
        // You may use models and queries depending on your setup
  
        // Sample response for demonstration purposes
        const violationDetail = {
          id: 1,
          type: 'Tidak memakai helm',
          vehicleNumberPlate: 'DK 2938 ACL',
          timestamp: '2023-03-01 (14:45:30)',
          user: {
            id: 'user-specific-id',
            fullname: 'Bimo',
          },
        };
  
        const response = {
          code: '200',
          status: 'OK',
          message: 'Violation details retrieved successfully',
          data: violationDetail,
        };
  
        res.json(response);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
    },
  };
  
  module.exports = violationController;
  