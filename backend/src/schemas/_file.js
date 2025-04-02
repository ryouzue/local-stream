export default {
  name: {
    isString: {
      errorMessage: "Not a string"
    },
    notEmpty: {
      errorMessage: "Empty value"
    }
  },
  path: {
    isString: {
      errorMessage: "Not a string"
    },
    notEmpty: {
      errorMessage: "Empty value"
    }
  },
  length: {
    optional: true,
    isNumber: {
      errorMessage: "Not a number"
    },
    notEmpty: {
      errorMessage: "Empty value"
    }
  },
  size: {
    optional: true,
    isNumber: {
      errorMessage: "Not a number"
    },
    notEmpty: {
      errorMessage: "Empty value"
    }
  },
  mimeType: {
    optional: true,
    isString: {
      errorMessage: "Not a string"
    },
    notEmpty: {
      errorMessage: "Empty value"
    }
  }
}