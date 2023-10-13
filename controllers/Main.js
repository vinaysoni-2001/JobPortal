const path=require("path")

exports.home=async(req, res) => {
    // Render the EJS template, passing data as an object
    // res.render('index');
    const jobs = [
      { title: 'Job Title 1', description: 'Job Description 1' },
      { title: 'Job Title 2', description: 'Job Description 2' },
      { title: 'Job Title 1', description: 'Job Description 1' },
      { title: 'Job Title 2', description: 'Job Description 2' },
      { title: 'Job Title 1', description: 'Job Description 1' },
      { title: 'Job Title 2', description: 'Job Description 2' },
      // Add more job data as needed
    ];

    res.render('index', { jobs: jobs }); 
  }

  exports.about=async(req, res) => {
    // Render the EJS template, passing data as an object
   
    res.render('aboutus'); 
  }

  exports.contact=async(req, res) => {
    // Render the EJS template, passing data as an object
   
    res.render('contact'); 
  }