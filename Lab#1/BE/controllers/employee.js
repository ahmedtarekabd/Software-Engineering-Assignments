const employee = [{ id: "1", name: "Mohamed Sayed" }];

exports.getEmployees = async (req, res, next) => {
  res.status(200).json({ data: employee });
};

// TODO
exports.deleteEmployee = async (req, res, next) => {
  const id = req.params.id;
  console.log("id", id);
  employee.forEach((emp, i) => (emp.id === id ? employee.splice(i, 1) : null));
  res.status(200).json({ data: employee });
};

// TODO
exports.createEmployee = async (req, res, next) => {
  const { id, name } = req.body;
  console.log("name:", name, ", id:", id);
  if (!name || !id) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  // Check If Employee Exists (based on id)
  const exists = employee.find((emp) => emp.id === id);
  if (exists) {
    console.log("exists?", exists);
    return res.status(400).json({ message: "Employee already exists" });
  }

  employee.push({ id: id, name: name });
  res.status(201).json({ data: employee });
};
