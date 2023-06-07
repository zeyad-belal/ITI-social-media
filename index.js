require('dotenv').config()
require('./db')
require('express-async-errors')
require('./utils/cloudinary')

const express = require('express')
const morgan = require('morgan')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')



const usersRoutes = require('./routes/usersRoutes');
const postsRoutes = require('./routes/postsRoutes');
const commentsRoutes = require('./routes/commentsRoutes');
const reviewsRoutes = require('./routes/reviewsRoutes');

app.use(express.json())
app.use(express.urlencoded())
app.use(morgan('dev'))
app.use(cors())


app.use('/users',usersRoutes)
app.use('/posts',postsRoutes)
app.use('/comments',commentsRoutes)
app.use('/reviews',reviewsRoutes)





//global error handler
app.use((err,req,res,next)=>{
	const statusCode = err.statusCode || 500;

	res.status(statusCode).send({
		status:statusCode,
		message: err?.message || 'internal server error',
		errors: err?.errors || []
	})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

