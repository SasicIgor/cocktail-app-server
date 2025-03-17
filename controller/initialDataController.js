const InitialData = require("./../model/initialDataModel");

const getData = async (req, res) => {
  try {
    const initialdata = await InitialData.find();
    if (!initialdata) {
      return res.status(404).json({
        status: "fail",
        message: "data not found",
      });
    }
    console.log(initialdata);
    res.status(200).json({
        status:"success",
        data: initialdata
    })
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Server error occured",
    });
  }
};

module.exports = {
    getData
}
