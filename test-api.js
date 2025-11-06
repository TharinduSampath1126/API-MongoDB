const testUser = {
  firstName: "John",
  lastName: "Doe", 
  age: 25,
  email: "john.doe@example.com",
  phone: "+1 123 456 7890",
  birthDate: "1998-01-01"
};

fetch('http://localhost:5000/api/users/add', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(testUser)
})
.then(response => response.json())
.then(data => console.log('Success:', data))
.catch(error => console.error('Error:', error));