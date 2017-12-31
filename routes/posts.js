
var posts = module.exports = {
    getPost(id){
        if(store.posts[id]){
            return {
                'name': store.posts[id].name,
                'url': store.posts[id].url,
                'text': store.posts[id].text,
            }
        }
        return NULL
    },
    getPosts(req, res){
        let store = req.store
        let postsArr = []
        for(let i=0; i < store.posts.length; i++){
            postsArr[i] = {
                'name': store.posts[i].name,
                'url': store.posts[i].url,
                'text': store.posts[i].text,
            }
        }
        res.status(200).send(postsArr)
    },
    addPost(req, res){
        let store = req.store
        let newPost = req.body
        // validate newPost
        if(newPost.name === undefined || newPost.url ===undefined){
            res.status(400).send('Invalid data')
        }

        if(newPost.name.trim().length < 3 || newPost.url.trim().length < 10){
            res.status(400).send('Invalid data')
        }

        // Add post
        let id = store.posts.length
        store.posts.push(newPost)
        res.status(201).send({'added postid': id})
    },
    updatePost(req, res){
        let store = req.store
        let postId = req.params.postId
        if(!store.posts[postId]){
            res.status(404).send('Not found')
        }
        store.posts[postId] = req.body
        res.status(201).send(store.posts[postId])
    },
    deletePost(req, res){
        let store = req.store
        let postId = req.params.postId
        if(!store.posts[postId]){
            res.status(404).send('Not found')
        }
        store.posts.splice(postId,1)
        res.status(204).send(store.posts[postId])
    }
}

