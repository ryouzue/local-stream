export default {
  username: {
    isLength: {
      options: {
        min: 3,
        max: 24
      },
      errorMessage: "Length: (min 3 - max 24)"
    },
    notEmpty: {
      errorMessage: "Empty value"
    },
    isString: {
      errorMessage: "Not a string"
    }
  },
  password: {
    isLength: {
      options: {
        min: 4,
        max: 28
      },
      errorMessage: "Length: (min 4 - max 28)"
    },
    notEmpty: {
      errorMessage: "Empty value"
    },
    isString: {
      errorMessage: "Not a string"
    }
  },
  coverImage: {
    isString: {
      errorMessage: "Not a string"
    }
  }
}