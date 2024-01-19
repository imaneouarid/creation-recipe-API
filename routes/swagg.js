/**
 * @swagger
 * /example:
 *   get:
 *     summary: Get an example resource
 *     description: Returns an example resource
 *     responses:
 *       200:
 *         description: Successful response
 */
router.get("/example", (req, res) => {
    res.json({ message: "Example route" });
  });
  