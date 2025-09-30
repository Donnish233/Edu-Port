fetch("https://dummyjson.com/users?limit=10&select=firstName,lastName,age,email,phone,password")
  .then((res) => res.json())
  .then(console.log);
