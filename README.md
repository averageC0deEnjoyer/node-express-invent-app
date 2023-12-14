what i learned:

-first we create model from UML
-then we create route and controller

notes:

collate can be use to check insensitive case
create route must be declared first before :id route
dont forget "" for key if have prop for example category.name --> "category.name"
cant chain populate().countDocument() , cause populate return promise
\*\*IMPORTANT .find vs .findOne . i use .find(req.params.id) and get error
