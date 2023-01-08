const handleError = (res, error) => {
    console.log(error);
    res.status(500).json({ 'Error:': error })
}
module.exports={
    handleError
}