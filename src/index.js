const express = require("express");
const axios = require("axios");
const { createClient } = require("redis");
const responseTime = require("response-time");
const { Pool } =require('pg');



const app = express();

// const config=({
//   user: 'root',
//   host: 'localhost',
//   password:'root',
//   database:'dockerDataBase'
// });

// const pool = new Pool(config);

// // Connecting to redis
// const client = createClient({
//   host: "127.0.0.1",
//   port: 6379,
// });

app.use(responseTime());

// // Get all characters
// app.get("/student", async (req, res, next) => {
//   try {
//     // Search Data in Redis


//     //const reply = await client.get("student");

//     // if exists returns from redis and finish with response
//     //if (reply) return res.send(JSON.parse(reply));

//     const response = await pool.query(`select at.attendance_date, p.first_name, p.last_name from attendances at
//     inner join students st on at.student_id = st.student_id
//     inner join persons p on st.person_id = p.person_id
//     where at.student_id = 11239 and at.attendance_date between '2021-01-25' and '2021-01-31'`);

//     // Saving the results in Redis. The "EX" and 10, sets an expiration of 10 Seconds
//     const saveResult = await client.set(
//       "student",
//       JSON.stringify(response.rows),
//       {
//         EX: 10,
//       }
//     );
//     console.log(saveResult)

//     // resond to client
//     res.send(response.rows);
//   } catch (error) {
//     res.send(error.message, "string error para ver");
//   }
// });

// // Get a single character
// app.get("/students", async (req, res, next) => {
//   try {
//     // Search Data in Redis
//     //const reply = await client.get("students");

//     // if exists returns from redis and finish with response
//     //if (reply) return res.send(JSON.parse(reply));

//     const response = await pool.query(`select at.attendance_date, p.first_name, p.last_name
//     from attendances at
//     inner join students st on at.student_id = st.student_id
//     inner join persons p on st.person_id = p.person_id
//     where at.attendance_date ='2021-01-25' and at.available_subject_id = 1`);

//     // Saving the results in Redis. The "EX" and 10, sets an expiration of 10 Seconds
//     const saveResult = await client.set(
//       "students",
//       JSON.stringify(response.rows),
//       {
//         EX: 10,
//       }
//     );
//     console.log(saveResult)

//     // resond to client
//     res.send(response.rows);
//   } catch (error) {
//     res.send(error.message, "string error para ver");
//   }
// });

// app.get("/students/A/B", async (req, res, next) => {
//   try {
//     // Search Data in Redis
//     //const reply = await client.get("studentAB");

//     //if (reply) return res.send(JSON.parse(reply));

//     const response = await pool.query(`SELECT  p.first_name, p.last_name, s.subject_name
//     from courses c , students st, persons p, available_subjects avs, subjects s
//     where c.available_subject_id between 1 and 1000 and c.student_id=st.student_id and p.person_id = st.person_id and
//     avs.available_subject_id = c.available_subject_id and s.subject_id = avs.subject_id
//     group by p.first_name, p.last_name, s.subject_name
//     having count(c.student_id) >1`);

//     const saveResult = await client.set(
//       "studentAB",
//       JSON.stringify(response.rows),
//       {
//         EX: 10,
//       }
//     );
//     console.log(saveResult)

//     // resond to client
//     res.send(response.rows);
//   } catch (error) {
//     res.send(error.message, "string error para ver");
//   }
// });

// app.get("/students/modulo-A-B", async (req, res, next) => {
//   try {
//     // Search Data in Redis
//    //const reply = await client.get("studentAinB");

//     //if (reply) return res.send(JSON.parse(reply));

//     const response = await pool.query(`select st.student_id, p.first_name, s.subject_name
//     from courses c
//     inner join students st on c.student_id=st.student_id
//     inner join persons p on st.person_id=p.person_id
//     inner join available_subjects a_s on c.available_subject_id=a_s.available_subject_id
//     inner join subjects s on a_s.subject_id=s.subject_id
//     where s.subject_id=4 and st.student_id  in
    
//     (select st.student_id 
//     from courses c
//     inner join students st on c.student_id=st.student_id
//     inner join persons p on st.person_id=p.person_id
//     inner join available_subjects a_s on c.available_subject_id=a_s.available_subject_id
//     inner join subjects s on a_s.subject_id=s.subject_id
//     where s.subject_id=1)`);
    
//     const saveResult = await client.set(
//       "studentAinB",
//       JSON.stringify(response.rows),
//       {
//         EX: 10,
//       }
//     );
//     console.log(saveResult)

//     // resond to client
//     res.send(response.rows);
//   } catch (error) {
//     res.send(error.message, "string error para ver");
//   }
// });

// app.get("/students/modulo-A-not-B", async (req, res, next) => {
//   try {
//     // Search Data in Redis
//     //const reply = await client.get("studentAnotB");

//    // if (reply) return res.send(JSON.parse(reply));

//     const response = await pool.query(`select st.student_id, p.first_name, s.subject_name
//     from courses c
//     inner join students st on c.student_id=st.student_id
//     inner join persons p on st.person_id=p.person_id
//     inner join available_subjects a_s on c.available_subject_id=a_s.available_subject_id
//     inner join subjects s on a_s.subject_id=s.subject_id
//     where s.subject_id=1 and st.student_id  in
    
//     (select st.student_id 
//     from courses c
//     inner join students st on c.student_id=st.student_id
//     inner join persons p on st.person_id=p.person_id
//     inner join available_subjects a_s on c.available_subject_id=a_s.available_subject_id
//     inner join subjects s on a_s.subject_id=s.subject_id
//     where s.subject_id=4)`);
//     const saveResult = await client.set(
//       "studentAnotB",
//       JSON.stringify(response.rows),
//       {
//         EX: 10,
//       }
//     );
//     console.log(saveResult)

//     // resond to client
//     res.send(response.rows);
//   } catch (error) {
//     res.send(error.message, "string error para ver");
//   }
// });
app.get("/students/modulo-A-not-B", async (req, res, next) => {

  res.send("hi");
});


app.get("/springBoot", async (req, res, next) => {
  try {

    const result = await axios.get("http://javaspring:8080/api/v1/GetAll")
    res.json(result.data);

  } catch (error) {
    console.log(error);
  }

});


async function main() {
  //await client.connect();
  app.listen(3000);
  console.log("server listen on port 3000");
}

main();
