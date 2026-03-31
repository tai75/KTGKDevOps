const studentForm = document.getElementById("student-form");
const studentList = document.getElementById("student-list");
const message = document.getElementById("message");
const reloadBtn = document.getElementById("reload-btn");

async function loadStudents() {
  studentList.innerHTML = "<li>Dang tai du lieu...</li>";

  try {
    const response = await fetch("/api/students");
    const students = await response.json();

    if (!Array.isArray(students) || students.length === 0) {
      studentList.innerHTML = "<li>Chua co du lieu trong database.</li>";
      return;
    }

    studentList.innerHTML = students
      .map(
        (student) =>
          `<li><strong>${student.fullName}</strong> - ${student.studentCode} - ${student.className}</li>`
      )
      .join("");
  } catch (error) {
    studentList.innerHTML = "<li>Khong tai duoc du lieu tu backend.</li>";
  }
}

studentForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  message.textContent = "Dang luu...";

  const formData = new FormData(studentForm);
  const payload = {
    fullName: formData.get("fullName"),
    studentCode: formData.get("studentCode"),
    className: formData.get("className")
  };

  try {
    const response = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      throw new Error("Create student failed");
    }

    message.textContent = "Da luu vao database thanh cong.";
    studentForm.reset();
    loadStudents();
  } catch (error) {
    message.textContent = "Luu that bai. Vui long thu lai.";
  }
});

reloadBtn.addEventListener("click", loadStudents);

loadStudents();
