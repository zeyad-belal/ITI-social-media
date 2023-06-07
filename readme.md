# email : admin@admin.com  ..  password: admin123


### Routes

## user routes
# (C) POST   users/signup  ....  users/login
# (R) GET    users         ....  users/:id
# (U) UPDATE users/:id
# (D) DELETE users/:id
# uploud image Post users/profile/:id 
#########################################
## post routes
# (C) POST   posts/new
# (R) GET    posts
# (U) UPDATE posts/:id
# (D) DELETE posts/:id
#########################################
## comment routes
# (C) POST   comments/new    (req.body should contain content + postID)
# (R) GET    comments        (req.body should contain postID)
# (U) UPDATE comments/:id    (req.body should contain the new content + postID)
# (D) DELETE comments/:id
#########################################
## review routes
# (C) POST   reviews/new     (req.body should contain content + postID)
# (R) GET    reviews/        (req.body should contain postID)
# (U) UPDATE reviews/:id     (req.body should contain the new content + postID)
# (D) DELETE reviews/:id