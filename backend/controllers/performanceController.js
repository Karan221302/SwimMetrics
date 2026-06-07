const PerformanceRecord = require(
    "../models/PerformanceRecord"
  );
  const User = require("../models/User");

  // Get filtered performance records
  exports.getMyPerformance = async (
    req,
    res
  ) => {
    try {
      const {
        stroke,
        distance,
        period,
      } = req.query;
  
      let query = {
        swimmer: req.user.id,
      };
  
      if (stroke) {
        query.stroke = stroke;
      }
  
      if (distance) {
        query.distance = Number(distance);
      }
  
      if (period) {
        const now = new Date();
  
        let startDate = new Date();
  
        switch (period) {
          case "month":
            startDate.setMonth(
              now.getMonth() - 1
            );
            break;
  
          case "3months":
            startDate.setMonth(
              now.getMonth() - 3
            );
            break;
  
          case "6months":
            startDate.setMonth(
              now.getMonth() - 6
            );
            break;
  
          default:
            startDate = null;
        }
  
        if (startDate) {
          query.createdAt = {
            $gte: startDate,
          };
        }
      }
  
      const records =
        await PerformanceRecord.find(
          query
        ).sort({
          createdAt: 1,
        });
  
      res.json(records);
    } catch (err) {
      console.log(err);
  
      res.status(500).json({
        message:
          "Error fetching performance records",
      });
    }
  };
  
  // Get PB, Latest, Average, Improvement
  exports.getPerformanceSummary =
    async (req, res) => {
      try {
        const {
          stroke,
          distance,
        } = req.query;
  
        const records =
          await PerformanceRecord.find({
            swimmer: req.user.id,
            stroke,
            distance: Number(distance),
          }).sort({
            createdAt: 1,
          });
  
        if (!records.length) {
          return res.json({
            pb: null,
            latest: null,
            average: null,
            improvement: null,
          });
        }
  
        const pb = Math.min(
          ...records.map(
            (r) => r.totalSeconds
          )
        );
  
        const latest =
          records[
            records.length - 1
          ].totalSeconds;
  
        const average =
          records.reduce(
            (sum, r) =>
              sum + r.totalSeconds,
            0
          ) / records.length;
  
        const improvement =
          records.length > 1
            ? records[0]
                .totalSeconds -
              latest
            : 0;
  
        res.json({
          pb,
          latest,
          average,
          improvement,
        });
      } catch (err) {
        console.log(err);
  
        res.status(500).json({
          message:
            "Error fetching performance summary",
        });
      }
    };


exports.getSwimmerAnalytics = async (req, res) => {
  try {
    const swimmer = await User.findById(
      req.params.userId
    ).select("name email");

    const records = await PerformanceRecord.find({
      swimmer: req.params.userId,
    }).sort({ createdAt: 1 });

    const totalDistance = records.reduce(
      (sum, r) => sum + (r.distance || 0),
      0
    );

    const bestTime =
      records.length > 0
        ? Math.min(
            ...records.map((r) => r.totalSeconds)
          )
        : null;

    res.json({
      swimmer,
      totalDistance,
      bestTime,
      records,
    });
  } catch (err) {
    res.status(500).json(err.message);
  }
};