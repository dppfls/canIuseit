exports.calendar = async (req, res) => {
    await req.body.forEach((res) => {
        calendar.create({
            title: res.title,
            start: res.start,
            end: res.end,
            backgroundColor: res.backgroundColor,
        });
    });
    res.status(200).send('Calendar events created successfully');
};
