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
  image: {
    custom: {
      options: (value, { req }) => {
        if (!req.file) throw new Error('\'image\' file is required');
        return true;
      },
      errorMessage: "\'image\' file is required"
    }
  }
}

export const ImageSchemaOpt = {
  author: {
    optional: true,
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
  image: {
    optional: true,
    custom: {
      options: (value, { req }) => {
        if (!req.file) throw new Error('\'image\' file is required');
        return true;
      },
      errorMessage: "\'image\' file is required"
    }
  }
}