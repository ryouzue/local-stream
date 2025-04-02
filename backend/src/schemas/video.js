export default {
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
  title: {
    isLength: {
      options: {
        min: 6,
        max: 64
      },
      errorMessage: "Length: (min 6 - max 64)" 
    },
    notEmpty: {
      errorMessage: "Empty value"
    },
    isString: {
      errorMessage: "Not a string"
    }
  },
  description: {
    optional: true,
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
  tags: {
    optional: true,
    isArray: {
      errorMessage: "Not an array"
    }
  },
  file: {
    isString: {
      errorMessage: "Not a string"
    },
    notEmpty: {
      errorMessage: "Empty value"
    }
  }
}