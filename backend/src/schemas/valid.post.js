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
      errorMessage: "Empty field"
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
      errorMessage: "Empty field"
    },
    isString: {
      errorMessage: "Not a string"
    }
  }
}