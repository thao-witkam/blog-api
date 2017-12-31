
var comments = module.exports = {
    getComments(req, res){
        let store = req.store
        let postId = req.params.postId
        if(store.posts[postId]=== undefined){
            res.status(404).send('Not found')
        }
        res.status(200).send(store.posts[postId].comments)
    },
    add(req, res){
        let store = req.store
        let postId = req.params.postId
        if(store.posts[postId]=== undefined){
            res.status(404).send('Not found')
        }

        let curPost = store.posts[postId]
        let newId = curPost.comments.length
        curPost.comments.push(req.body)
        res.status(201).send(curPost.comments[newId])

    },
    update(req, res){
        let store = req.store
        let postId = req.params.postId
        let commentId = req.params.commentId
        if(store.posts[postId]=== undefined){
            res.status(404).send('Not found')
        }

        let curPost = store.posts[postId]
        if(curPost.comments[commentId]=== undefined){
            res.status(404).send('Not found')
        }

        curPost.comments[commentId] = req.body
        res.status(200).send(curPost.comments[commentId])

    },
    delete(req, res){
        let store = req.store
        let postId = req.params.postId
        let commentId = req.params.commentId
        if(store.posts[postId]=== undefined){
            res.status(404).send('Not found')
        }

        let curPost = store.posts[postId]
        if(curPost.comments[commentId]=== undefined){
            res.status(404).send('Not found')
        }
        curPost.comments.splice(commentId, 1)
        res.status(204).send()
    }
}
