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
  video: {
    custom: {
      options: (value, { req }) => {
        if (!req.file) throw new Error('\'video\' file is required');
        return true;
      },
      errorMessage: "\'video\' file is required"
    }
  }
}