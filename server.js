const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const apiRoutes = require('./routes')
let postRoutes = apiRoutes.posts
let commentRoutes = apiRoutes.comments


let store = {
    posts: [
        {
            name: 'Top 10 ES6 Features every Web Developer must know',
            url: 'https://webapplog.com/es6',
            text: 'This essay will give you a quick introduction to ES6. If you don’t know what is ES6, it’s a new JavaScript implementation.',
            comments: [
                {text: 'Cruel…..var { house, mouse} = No type optimization at all'},
                {text: 'I think you’re undervaluing the benefit of ‘let’ and ‘const’.'},
                {text: '(p1,p2)=>{ … } ,i understand this ,thank you !'}
            ]
        }
    ]
}


let app = express()
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use((req, res, next)=>{
    req.store = store
    next()
})



/* POSTS */

app.get('/posts', postRoutes.getPosts)
app.post('/posts', postRoutes.addPost)
app.put('/posts/:postId', postRoutes.updatePost)
app.delete('/posts/:postId', postRoutes.deletePost)


/* COMMENTS */
app.get('/posts/:postId/comments', commentRoutes.getComments)
app.post('/posts/:postId/comments', commentRoutes.add)
app.put('/posts/:postId/comments/:commentId', commentRoutes.update)
app.delete('/posts/:postId/comments/:commentId', commentRoutes.delete)



app.listen(3000)