const errorHandlerMiddleware = (err, req, res, next) => {
	if (err.type === "unprocessable" || err.type === "notClose") return res.status(400).send(err.message);
	if (err.type === "notFound") return res.status(404).send(err.message);
	if (err.type === "conflict") return res.status(409).send(err.message);
	if (err.type === "noStock" || err.type === "notOpen") return res.status(422).send(err.message);
	return res.status(500).send(err.message);
}

export default errorHandlerMiddleware