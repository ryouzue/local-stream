export default {
  title: {
    isLength: {
      options: {
        min: 6,
        max: 46
      },
      errorMessage: "Length: (min 6 - max 46)"
    },
    notEmpty: {
      errorMessage: "Empty value"
    },
    isString: {
      errorMessage: "Not a string"
    }
  },
  description: {
    isLength: {
      options: {
        max: 2048
      },
      errorMessage: "Length: (max 2048)"
    },
    notEmpty: {
      errorMessage: "Empty value"
    },
    isString: {
      errorMessage: "Not a string"
    }
  },
  author: {
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
  coverImage: String
}