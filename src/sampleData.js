// Note that the "show_if" method in the conditional field doesn't work in an actual JSON file,
// but does work here if we import the sample data as an array of javascript objects.

export const sampleData = [{
  "tag": "input",
  "name": "first_name",
  "type": "text",
  "human_label": "First Name"
}, {
  "tag": "input",
  "name": "last_name",
  "type": "text",
  "human_label": "Last Name"
}, {
  "tag": "input",
  "name": "email",
  "type": "email",
  "human_label": "Email Address"
}, {
  "tag": "input",
  "name": "phone_number",
  "type": "text",
  "human_label": "Phone Number"
}, {
  "tag": "input",
  "name": "job_title",
  "type": "text",
  "human_label": "Job Title"
}, {
  "tag": "input",
  "name": "date_of_birth",
  "type": "date",
  "human_label": "Date of Birth"
}, {
  "tag": "input",
  "name": "parental_consent",
  "type": "checkbox",
  "human_label": "Parental Consent",
  "conditional": {
    "name": "date_of_birth",
    // I did make a one-line change to this evaluative function.
    // Instead of comparing the value as-is, I first converted the input value 
    // to a new Date() before comparison. 
    // It wasn't working with the date saved by the form otherwise.
	"show_if": (value) => {
        const now = new Date();
        return new Date(value) >= new Date(now.getFullYear() - 13, now.getMonth(), now.getDate());
      }
  }
}]