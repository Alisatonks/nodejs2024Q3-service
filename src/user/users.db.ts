export const USERS = [
    {
        "id": "6b1f52c1-3d8a-4b9c-95ed-d9a9f6a3e8b7",
        "login": "username123",
        "password": "securePassword",
        "version": 1,
        "createdAt": 1700000000000,
        "updatedAt": 1700000000000
      }
]

export const findUser = (id: string) => {
  return USERS.find(user => user.id === id);
}

export const validateId = (id: string) => {
  const regExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
  return regExp.test(id);
}