exports.calendar = async (req, res) => {
    await req.body.forEach((res) => {
        calendar.create({
            alias: res.alias,
            start: res.start,
            userId: res.userId,
            backgroundColor: res.backgroundColor,
        });
    });
    res.status(200).send('Calendar events created successfully');
};
