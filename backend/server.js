const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const dotenv = require('dotenv').config();

const app = express();
app.use(cors({
 origin: "https://localhost:5173",

  credentials: true
}));
app.use(express.json()); 

const db = mysql.createConnection({
  host: "localhost",      
  user: "root",      
  password: "",   
  database: "sadph",   
});

db.connect((err) => {
  if (err) {
    console.log('Database connection error:', err);
    return;
  }
  console.log('Connected to MySQL database');
});


const logActivity = (username, activityType) => {
  
  if (!username || !activityType) {
    console.error('Invalid parameters: username and activityType are required');
    return; 
  }

  const logsQuery = `
    INSERT INTO logs (username, activityType, timestamp)
    VALUES (?, ?, ?)
  `;
  const timestamp = new Date();

  console.log(`Logging activity: ${activityType} for user: ${username} at ${timestamp}`);

  db.query(logsQuery, [username, activityType, timestamp], (logErr) => {
    if (logErr) {
      console.error('Error logging activity:', logErr.message);
    } else {
      console.log('Activity logged successfully:', { username, activityType, timestamp });

    }
  });
};

//   endpoint
app.post('/login', (req, res) => {  
  const { username, password } = req.body; 
  const sqlQuery = 'SELECT username, password FROM owner WHERE username = ?'; 
  
  db.query(sqlQuery, [username], (err, result) => {
    if (err) {
      console.log('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }  

    if (result.length > 0) {
      const user = result[0];

      
      if (password === user.password) {
        logActivity(user.username, 'Login');
        
        res.json({ success: true, username: user.username });
      } else {
        
        res.json({ success: false, message: 'Invalid password' });
      }
    } else {
      
      res.json({ success: false, message: 'Invalid username' });
    }
  }); 
});


app.post('/logout', (req, res) => {
  const { username } = req.body; // Assuming you send the username in the request body
  console.log(`Logout request received for user: ${username}`);

  logActivity(username, 'Logout'); // Log the logout activity

  res.json({ success: true, message: 'Logged out successfully' });
});

//Logs
app.get('/api/logs', (req, res) => {
  const query = 'SELECT logs_id, username, activityType, timestamp FROM logs';
  
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    res.json(results);
  });
});

app.get('/api/owner', (req, res) => {
  db.query('SELECT * FROM owner', (error, results) => {
    if (error) {
      console.error("Error fetching owners:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

app.post('/api/owner', (req, res) => {
  const { USERNAME, PASSWORD } = req.body;
  const sqlQuery = 'INSERT INTO owner (username, password) VALUES (?, ?)';
  db.query(sqlQuery, [USERNAME, PASSWORD], (err, result) => { 
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true, message: 'Owner created successfully!' });
  });
});

app.get('/api/owner', (req, res) => {
  db.query('SELECT * FROM owner', (error, results) => {
    if (error) {
      console.error("Error fetching owners:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

//mobile fetching


app.get('/api/cgatt', (req, res) => {
  const query = 'SELECT cgatt.caregiverId, caregivers.cgauser AS username, cgatt.activityType, cgatt.timestamp FROM cgatt INNER JOIN caregivers ON cgatt.caregiverId = caregivers.id WHERE cgatt.activityType IN ("login", "logout");';
  
  db.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ error: 'Database query failed' });
    }
    console.log(results);
    res.json(results);
  });
});
  

// Endpoint to fetch caregivers
app.get('/api/caregivers', (req, res) => { 
  const sqlQuery = 'SELECT * FROM caregivers';
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/caregivers', (req, res) => {
  const {
      FIRSTNAME, MIDDLENAME, LASTNAME, EMAIL, CONTACT, AGE, AVAILABILITY,
      BRGY, CITY, COUNTRY, CPR, EXP, GENDER, PROVINCE, STREET, WORKHOURS, ZIP, 
      BIRTH, CGAUSER, CGAPASS, ECBRGY, ECCITY, ECCOUNTRY, ECEMAIL, ECFIRST, ECLAST, ECMIDDLE,
      ECNUM, ECPROVINCE, ECREL, ECST, ECZIP, room
  } = req.body;

  const sqlQuery = `INSERT INTO caregivers (firstname, middlename, lastname, email, contact, age, availability, brgy, city, country, cpr, exp, gender, province, street, workhours, zip, birth, cgauser, cgapass, ecbrgy, eccity, eccountry, ecemail, ecfirst, eclast, ecmiddle, ecnum, ecprovince, ecrel, ecst, eczip, room) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)`;

  db.query(sqlQuery, [
      FIRSTNAME, MIDDLENAME, LASTNAME, EMAIL, CONTACT, AGE, AVAILABILITY, BRGY, CITY, COUNTRY, CPR, EXP, GENDER, PROVINCE, STREET, WORKHOURS, ZIP, BIRTH, CGAUSER, CGAPASS, ECBRGY, ECCITY, ECCOUNTRY, ECEMAIL, ECFIRST, ECLAST, ECMIDDLE, ECNUM, ECPROVINCE, ECREL, ECST, ECZIP, room
  ], (err, result) => {
      if (err) {
          console.error("Database error:", err); 
          return res.status(500).json({ success: false, message: 'Database error' });
      }

      res.json({ success: true, message: 'Caregiver account created successfully!' });
  });
});

// Endpoint to fetch a single caregiver by ID
app.get('/api/caregivers/:id', (req, res) => {
  const id = req.params.id;
  const sqlQuery = 'SELECT * FROM caregivers WHERE id = ?';
  db.query(sqlQuery, [id], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    if (result.length > 0) {
      res.json(result[0]);
    } else {
      res.status(404).json({ success: false, message: 'Caregiver not found' });
    }
  });
});

app.put('/api/caregivers/:id', (req, res) => {
  const id = req.params.id;
  const {
    cgauser, cgapass, firstname, middlename, lastname, birth, gender, age,
    contact, email, street, exp, availability, workhours, cpr,
    ecfirst, ecmiddle, eclast, ecrel, ecnum, ecemail, ecst, room
  } = req.body;

  const sqlQuery = `
    UPDATE caregivers 
    SET 
      cgauser = ?,
      cgapass = ?,
      firstname = ?,
      middlename = ?,
      lastname = ?,
      birth = ?,
      gender = ?,
      age = ?,
      contact = ?,
      email = ?,
      street = ?,
      exp = ?,
      availability = ?,
      workhours = ?,
      cpr = ?,
      ecfirst = ?,
      ecmiddle = ?,
      eclast = ?,
      ecrel = ?,
      ecnum = ?,
      ecemail = ?,
      ecst = ?,
      room = ?
    WHERE id = ?
  `;
  
  db.query(sqlQuery, [
    cgauser, cgapass, firstname, middlename, lastname, birth, gender, age,
    contact, email, street, exp, availability, workhours, cpr,
    ecfirst, ecmiddle, eclast, ecrel, ecnum, ecemail, ecst, room,
    id
  ], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Caregiver not found' });
    }
    
    res.json({ success: true, message: 'Caregiver updated successfully' });
  });
});


// Endpoint to delete caregivers
app.delete('/api/caregivers', (req, res) => {
  const { ids } = req.body; // Expecting an array of ids to delete
  const sqlQuery = 'DELETE FROM caregivers WHERE id IN (?)';

  db.query(sqlQuery, [ids], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true, message: 'Caregivers deleted successfully!' });
  });
});



app.get('/api/patients', (req, res) => {
  
  const sqlQuery = `SELECT 
    elderlyprofile.*,  -- Select all columns from elderly_profile
    caregivers.firstname  -- Include caregiver name from caregivers
FROM 
    elderlyprofile
LEFT JOIN 
    caregivers  -- Join caregivers table
ON 
    elderlyprofile.room_no = caregivers.room;  -- Match room_no;
`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

app.post('/patients', (req, res) => {
  const {
      first_name, middle_name, last_name, preferred_name, age, date_of_birth,
      gender, chronic_illnesses, allergies, medication_name, medication_dosage, medication_frequency,
      surgery_name, date_of_surgery, surgical_outcome, ec_first_name, ec_middle_name, ec_last_name, ec_relationship, ec_contact_number, ec_email, ec_street,
      ec_barangay, ec_province, ec_city, ec_country, ec_zip,  room_no,  profile_picture 
  } = req.body;

  const profilePicture = req.file ? req.file.path : null;

  const sqlqQuery = `INSERT INTO elderlyprofile (first_name, middle_name, last_name, preferred_name, age, date_of_birth,
      gender, chronic_illnesses, allergies, medication_name, medication_dosage, medication_frequency,
      surgery_name, date_of_surgery, surgical_outcome, ec_first_name, ec_middle_name, ec_last_name, ec_relationship, ec_contact_number, ec_email, ec_street,
      ec_barangay, ec_province, ec_city, ec_country, ec_zip,  room_no,  profile_picture  ) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

  db.query(sqlqQuery, [
    first_name, middle_name, last_name, preferred_name, age, date_of_birth,
    gender, chronic_illnesses, allergies, medication_name, medication_dosage, medication_frequency,
    surgery_name, date_of_surgery,surgical_outcome, ec_first_name, ec_middle_name, ec_last_name, ec_relationship, ec_contact_number, ec_email, ec_street,
    ec_barangay, ec_province, ec_city, ec_country, ec_zip,  room_no,  profile_picture 
  ], (err, result) => {
      if (err) {
          console.error("Database error:", err); 
          return res.status(500).json({ success: false, message: 'Database 154 error' });
      }

       // Log whether the image was uploaded successfully
    if (profilePicture) {
      console.log("Image uploaded successfully:", profilePicture);
    } else {
      console.log("No image uploaded.");
    }

      res.json({ success: true, message: 'Caregiver account created successfully!' });
  });
});

app.delete('/api/patients', (req, res) => {
  const { ids } = req.body; // Expecting an array of ids to delete
  const sqlQuery = 'DELETE FROM elderlyprofile WHERE id IN (?)';

  db.query(sqlQuery, [ids], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true, message: 'Patient Profile deleted successfully!' });
  });
});


//morning

app.get('/api/morning/:id', (req, res) => {
  const patientId = req.params.id;
  
  const sqlQuery = 
  `
  SELECT 
    tasklist.task_name, 
    task_entries.status, 
    task_entries.remarks, 
    task_entries.task_date,
    task_entries.patient_id,  
    elderlyprofile.first_name,  
    caregivers.firstname,  
    elderlyprofile.room_no,
    task_entries.time_of_day  
FROM 
    task_entries 
JOIN 
    tasklist 
ON 
    task_entries.task_id = tasklist.id 
JOIN 
    elderlyprofile  
ON 
    task_entries.patient_id = elderlyprofile.id  
JOIN 
    caregivers  
ON 
    elderlyprofile.room_no = caregivers.room  
WHERE 
    task_entries.time_of_day = "morning" AND
    task_entries.patient_id = ?;

`;

db.query(sqlQuery, [patientId], (err, results) => {
    console.log(results);
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

//afternoon


app.get('/api/afternoon/:id', (req, res) => {
  const patientId = req.params.id;
  
  const sqlQuery = `
  SELECT 
    tasklist.task_name, 
    task_entries.status, 
    task_entries.remarks, 
    task_entries.task_date,
    task_entries.patient_id,  -- Patient ID from task_entries
    task_entries.time_of_day,
    elderlyprofile.first_name,  -- Patient Name from elderly_profile
    caregivers.firstname,  -- Caregiver Name from caregivers table
    elderlyprofile.room_no
FROM 
    task_entries 
JOIN 
    tasklist 
ON 
    task_entries.task_id = tasklist.id 
JOIN 
    elderlyprofile  
ON 
    task_entries.patient_id = elderlyprofile.id  -- Matching patient_id
JOIN 
    caregivers  
ON 
    elderlyprofile.room_no = caregivers.room  -- Matching room from elderly_profile and caregivers
WHERE 
    task_entries.time_of_day = "afternoon" AND
    task_entries.task_date = CURDATE() AND
    task_entries.patient_id = ?;

    `;
  
  db.query(sqlQuery, [patientId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

//evening

app.get('/api/evening/:id', (req, res) => {
  const eveningpatientId = req.params.id;
  
  const sqlQuery = `
    SELECT 
    tasklist.task_name, 
    task_entries.status, 
    task_entries.remarks, 
    task_entries.task_date,
    task_entries.patient_id,  -- Patient ID from task_entries
    task_entries.time_of_day,
    elderlyprofile.first_name,  -- Patient Name from elderly_profile
    caregivers.firstname,  -- Caregiver Name from caregivers table
    elderlyprofile.room_no
FROM 
    task_entries 
JOIN 
    tasklist 
ON 
    task_entries.task_id = tasklist.id 
JOIN 
    elderlyprofile  
ON 
    task_entries.patient_id = elderlyprofile.id  -- Matching patient_id
JOIN 
    caregivers  
ON 
    elderlyprofile.room_no = caregivers.room  -- Matching room from elderly_profile and caregivers
WHERE 
    task_entries.time_of_day = "evening" AND
    task_entries.task_date = CURDATE() AND
    task_entries.patient_id = ?;

  `;
  db.query(sqlQuery, [eveningpatientId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

//patadl

app.get('/api/patadl/:id', (req, res) => {
  const patientId = req.params.id;

  const sqlQuery = `
     SELECT 
    tasklist.task_name, 
    task_entries.status, 
    task_entries.remarks, 
    task_entries.task_date, 
    task_entries.time_of_day, 
    elderlyprofile.first_name, 
    caregivers.firstname,
    caregivers.room
FROM 
    task_entries 
JOIN 
    tasklist 
ON 
    task_entries.task_id = tasklist.id
JOIN 
    elderlyprofile 
ON 
    task_entries.patient_id = elderlyprofile.id
JOIN 
    caregivers 
ON 
    elderlyprofile.room_no = caregivers.room AND
    task_entries.time_of_day = "adl" AND
    task_entries.patient_id = ?;
  `;
  db.query(sqlQuery, [patientId],(err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });

  //task_entries.task_date = CURDATE() AND
  
});

app.get('/api/records', (req, res) => {
  const { date } = req.query;
  const sqlQuery = `SELECT * FROM task_entries WHERE task_date = ?`;
  db.query(sqlQuery, [date], (err, results) => {
    res.json(results);
  });
});

app.get('/api/progresspie', (req, res) => {
  const sqlQuery = `SELECT 
    te.time_of_day,
    COUNT(tl.id) AS total_tasks,  -- Count total tasks from tasklist
    COUNT(CASE WHEN te.status = 'completed' THEN 1 END) AS completed_tasks,  -- Count completed tasks
    COUNT(CASE WHEN te.status != 'completed' THEN 1 END) AS pending_tasks,  -- Count pending tasks (not completed)
    (COUNT(CASE WHEN te.status = 'completed' THEN 1 END) * 100.0 / COUNT(tl.id)) AS completed_percentage,
    (COUNT(CASE WHEN te.status != 'completed' THEN 1 END) * 100.0 / COUNT(tl.id)) AS pending_percentage  -- Pending percentage calculation
FROM 
    task_entries te
JOIN 
    tasklist tl ON te.task_id = tl.id
JOIN 
    elderlyprofile ep ON te.patient_id = ep.id
JOIN 
    caregivers c ON ep.room_no = c.room
GROUP BY 
    te.time_of_day
ORDER BY 
    te.time_of_day;
`;
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/api/caregiverscompletion/:id', (req, res) => {
  const caregiverId = req.params.id;
  const sqlQuery = `
    SELECT 
    c.firstname AS caregiver_name,  
    ep.first_name AS patient_name,  
    te.time_of_day,  
    COUNT(te.task_entry_id) AS total_tasks,  
    COUNT(CASE WHEN te.status = 'completed' THEN 1 END) AS completed_tasks,  
    COUNT(CASE WHEN te.status != 'completed' THEN 1 END) AS pending_tasks,  
    (COUNT(CASE WHEN te.status = 'completed' THEN 1 END) * 100.0 / COUNT(te.task_entry_id)) AS completed_percentage,  
    (COUNT(CASE WHEN te.status != 'completed' THEN 1 END) * 100.0 / COUNT(te.task_entry_id)) AS pending_percentage  
FROM 
    caregivers c
JOIN 
    elderlyprofile ep ON c.room = ep.room_no  
JOIN 
    task_entries te ON ep.id = te.patient_id  
WHERE 
    c.id = ?
GROUP BY 
    c.firstname, ep.first_name, te.time_of_day  
ORDER BY 
    c.firstname, ep.first_name, te.time_of_day;
  `;
  db.query(sqlQuery, [caregiverId], (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

app.get('/api/taskslist', (req, res) => {
  
  const sqlQuery = 'SELECT * FROM tasklist';
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json(results);
  });
});

// Task creation endpoint
app.post("/taskslist", (req, res) => {
  const { task_name, description, sched_time } = req.body;

  if (!task_name || !description || !sched_time) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  const sqlQuery = `INSERT INTO tasklist (task_name, description, sched_time) VALUES (?, ?, ?)`;

  db.query(sqlQuery, [task_name, description, sched_time], (err, result) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ success: false, message: "Database error" });
    }

    res.json({ success: true, message: "Task created successfully!" });
  });
});

app.delete('/api/taskslist', (req, res) => {
  const { ids } = req.body;
  
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ 
      success: false, 
      message: 'No tasks selected for deletion' 
    });
  }

  const sqlQuery = 'DELETE FROM tasklist WHERE id IN (?)';
  
  db.query(sqlQuery, [ids], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ 
        success: false, 
        message: 'Error deleting tasks' 
      });
    }
    
    res.json({ 
      success: true, 
      message: `Successfully deleted ${result.affectedRows} task(s)` 
    });
  });
});

// Endpoint to get counts
app.get('/api/counts', (req, res) => {
  const roomQuery = 'SELECT COUNT(DISTINCT room) as count FROM caregivers'; 
  const caregiverQuery = 'SELECT COUNT(*) as count FROM caregivers';
  const patientQuery = 'SELECT COUNT(*) as count FROM elderlyprofile';
  const taskslistQuery = 'SELECT COUNT(*) as count FROM tasklist';
  const loggedInCaregiversQuery = 'SELECT COUNT(DISTINCT caregiverId) as count FROM cgatt WHERE activityType = "login"';

  db.query(roomQuery, (roomErr, roomResults) => {
    if (roomErr) {
      console.error('Room count error:', roomErr);
      return res.status(500).json({ error: 'Database error' });
    }

    db.query(caregiverQuery, (caregiverErr, caregiverResults) => {
      if (caregiverErr) {
        console.error('Caregiver count error:', caregiverErr);
        return res.status(500).json({ error: 'Database error' });
      }

      db.query(patientQuery, (patientErr, patientResults) => {
        if (patientErr) {
          console.error('Patient count error:', patientErr);
          return res.status(500).json({ error: 'Database error' });
        }

        db.query(taskslistQuery, (taskslistErr, taskslistResults) => {
          if (taskslistErr) {
            console.error('Taskslist count error:', taskslistErr);
            return res.status(500).json({ error: 'Database error' });
          }

          db.query(loggedInCaregiversQuery, (loginErr, loginResults) => {
            if (loginErr) {
              console.error('Logged-in caregivers count error:', loginErr);
              return res.status(500).json({ error: 'Database error' });
            }

            res.json({
              rooms: roomResults[0].count,
              caregivers: caregiverResults[0].count,
              patients: patientResults[0].count,
              taskslist: taskslistResults[0].count,
              loggedInCaregivers: loginResults[0].count
            });

            console.log('Counts:', {
              rooms: roomResults[0].count,
              caregivers: caregiverResults[0].count,
              patients: patientResults[0].count,
              taskslist: taskslistResults[0].count,
              loggedInCaregivers: loginResults[0].count
            });
          });
        });
      });
    });
  });
});

app.post('/api/logs', (req, res) => {
  const { username, activityType, timestamp } = req.body;

  if (!username || !activityType || !timestamp) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  const logsQuery = `
    INSERT INTO logs (username, activityType, timestamp)
    VALUES (?, ?, ?)
  `;

  db.query(logsQuery, [username, activityType, timestamp], (err) => {
    if (err) {
      console.error('Error logging activity:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    res.json({ success: true, message: 'Activity logged successfully' });
  });
});

app.put('/api/patients/:id', (req, res) => {
  const id = req.params.id;
  const {
    first_name, middle_name, last_name, preferred_name, date_of_birth,
    surgery_name, date_of_surgery, surgical_outcome,
    chronic_illnesses, allergies,
    medication_name, medication_dosage, medication_frequency,
    ec_first_name, ec_middle_name, ec_last_name, ec_relationship,
    ec_contact_number, ec_email, ec_street, ec_city, ec_province,
    ec_zip, ec_country
  } = req.body;

  const sqlQuery = `
    UPDATE elderlyprofile 
    SET 
      first_name = ?,
      middle_name = ?,
      last_name = ?,
      preferred_name = ?,
      date_of_birth = ?,
      surgery_name = ?,
      date_of_surgery = ?,
      surgical_outcome = ?,
      chronic_illnesses = ?,
      allergies = ?,
      medication_name = ?,
      medication_dosage = ?,
      medication_frequency = ?,
      ec_first_name = ?,
      ec_middle_name = ?,
      ec_last_name = ?,
      ec_relationship = ?,
      ec_contact_number = ?,
      ec_email = ?,
      ec_street = ?,
      ec_city = ?,
      ec_province = ?,
      ec_zip = ?,
      ec_country = ?
    WHERE id = ?
  `;
  
  db.query(sqlQuery, [
    first_name, middle_name, last_name, preferred_name, date_of_birth,
    surgery_name, date_of_surgery, surgical_outcome,
    chronic_illnesses, allergies,
    medication_name, medication_dosage, medication_frequency,
    ec_first_name, ec_middle_name, ec_last_name, ec_relationship,
    ec_contact_number, ec_email, ec_street, ec_city, ec_province,
    ec_zip, ec_country,
    id
  ], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      return res.status(500).json({ success: false, message: 'Database error' });
    }
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Patient not found' });
    }
    
    res.json({ success: true, message: 'Patient updated successfully' });
  });
});

const PORT = process.env.PORT || 5124;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

