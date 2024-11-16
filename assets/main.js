document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("resume-form");

    const educationSection = document.getElementById("education-section");
    const experienceSection = document.getElementById("experience-section");

    // Add new education entry
    document.getElementById("add-education").addEventListener("click", () => {
        const newEducation = document.createElement("div");
        newEducation.classList.add("education-entry");
        newEducation.innerHTML = `
            <label for="degree">Degree</label>
            <input type="text" class="degree" placeholder="Enter your degree" required>
            <label for="institution">Institution</label>
            <input type="text" class="institution" placeholder="Enter your institution" required>
            <label for="year">Year of Completion</label>
            <input type="text" class="year" placeholder="Enter your year of completion" required>
            <label for="grade">Grade/Percentage</label>
            <input type="text" class="grade" placeholder="Enter your grade/percentage" required>
            <button type="button" class="remove-education">Delete</button>
        `;
        educationSection.insertBefore(newEducation, document.getElementById("add-education"));
        
        // Add event listener for delete button
        newEducation.querySelector(".remove-education").addEventListener("click", () => {
            newEducation.remove();
        });
    });

    // Add new experience entry
    document.getElementById("add-experience").addEventListener("click", () => {
        const newExperience = document.createElement("div");
        newExperience.classList.add("experience-entry");
        newExperience.innerHTML = `
            <label for="job">Job Title</label>
            <input type="text" class="job" placeholder="Enter your job title" required>
            <label for="company">Company Name</label>
            <input type="text" class="company" placeholder="Enter your company name" required>
            <label for="duration">Duration</label>
            <input type="text" class="duration" placeholder="Enter your work duration" required>
            <label for="job-description">Job Description</label>
            <textarea class="job-description" placeholder="Describe your job" required></textarea>
            <button type="button" class="remove-experience">Delete</button>
        `;
        experienceSection.insertBefore(newExperience, document.getElementById("add-experience"));

        // Add event listener for delete button
        newExperience.querySelector(".remove-experience").addEventListener("click", () => {
            newExperience.remove();
        });
    });

    // Form submission handler
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        // Extract personal information
        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const phone = document.getElementById("phone").value;
        const address = document.getElementById("address").value;
        const languages = document.getElementById("languages").value.split(",")
            .map(lang => `<li>${lang.trim()}</li>`).join("");
        const skills = document.getElementById("skills").value.split(",")
            .map(skill => `<li>${skill.trim()}</li>`).join("");
        const imageFile = document.getElementById("image").files[0];

        // Handle image upload
        let imageURL = "";
        if (imageFile) {
            imageURL = URL.createObjectURL(imageFile);
        }

        // Collect education entries
        const educationEntries = Array.from(document.querySelectorAll(".education-entry")).map(entry => {
            const degree = entry.querySelector(".degree").value;
            const institution = entry.querySelector(".institution").value;
            const year = entry.querySelector(".year").value;
            const grade = entry.querySelector(".grade").value;
            return `<p><b>Degree:</b> ${degree}<br><b>Institution:</b> ${institution}<br><b>Year:</b> ${year}<br><b>Grade:</b> ${grade}</p>`;
        }).join("<hr>");

        // Collect experience entries
        const experienceEntries = Array.from(document.querySelectorAll(".experience-entry")).map(entry => {
            const job = entry.querySelector(".job").value;
            const company = entry.querySelector(".company").value;
            const duration = entry.querySelector(".duration").value;
            const description = entry.querySelector(".job-description").value;
            return `<p><b>Job Title:</b> ${job}<br><b>Company:</b> ${company}<br><b>Duration:</b> ${duration}<br><b>Description:</b> ${description}</p>`;
        }).join("<hr>");

        // Generate the resume content
        const generatedContent = `
            <div class="header">
                ${imageURL ? `<img src="${imageURL}" alt="Profile Picture">` : ""}
                <div class="header-text">
                    <h3>${name}</h3>
                    <p><b>Email:</b> ${email}</p>
                    <p><b>Phone:</b> ${phone}</p>
                    <p><b>Address:</b> ${address}</p>
                </div>
            </div>
            <hr>
            <h3>Languages:</h3>
            <ul>${languages}</ul>
            <hr>
            <h3>Skills:</h3>
            <ul>${skills}</ul>
            <hr>
            <h3>Education:</h3>
            ${educationEntries}
            <hr>
            <h3>Experience:</h3>
            ${experienceEntries}
        `;

        // Open the resume in a new window
        const resumeWindow = window.open("", "_blank");
        resumeWindow.document.write(`
            <html>
            <head>
                <title>Generated Resume</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        color: #2c3e50;
                        background-color: #f2f4f7;
                        margin: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        min-height: 100vh;
                    }
                    .container {
                        max-width: 650px;
                        padding: 20px;
                        background-color: #ffffff;
                        border-radius: 12px;
                        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
                        margin: auto;
                    }
                    .header {
                        display: flex;
                        align-items: center;
                        gap: 15px;
                    }
                    .header img {
                        width: 100px;
                        height: 100px;
                        border-radius: 50%;
                        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
                    }
                    .header h3 {
                        margin: 0;
                        font-size: 1.8em;
                    }
                    ul {
                        padding-left: 20px;
                        list-style-type: disc;
                    }
                    p, ul {
                        margin: 10px 0;
                        text-align: justify;
                    }
                    hr {
                        border: none;
                        border-top: 1px solid #dcdcdc;
                        margin: 20px 0;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    ${generatedContent}
                </div>
            </body>
            </html>
        `);
    });
});
