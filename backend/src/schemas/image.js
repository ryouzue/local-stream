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
  type: {
    optional: true,
    custom: {
      options: (value) => {
        const types = ['static', 'animated'];
        if(!types.includes(value)) throw new Error('Not a valid type');
        return true;
      },
      errorMessage: "Not a valid type"
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