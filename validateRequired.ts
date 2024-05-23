// This is a helper function to validate all required fields are passed in with a Next.js server endpoint
export const validateRequired = <ParamType extends object = Record<string | number, unknown>>(
  params: ParamType = {} as ParamType,
  toBeChecked: Array<string | number>,
) => {
  if (typeof params !== 'object') {
    params = {} as ParamType;
  }
  const missing = toBeChecked.reduce<Array<string | number>>((bank, val) => {
    if (!(val in params)) {
      return [...bank, val];
    }
    return bank;
  }, []);

  if (missing.length) {
    throw new NextError(
      `Missing/Invalid values for param(s): ${missing.join(', ')}`,
      {
        status: 400,
        errorCode: ERROR_CODES.BAD_REQUEST,
      },
    );
  }
  return params as unknown as NoUndefinedField<ParamType>;
};
