// import { FieldsType } from '@/types/Types';

// export const validateFields = (
//   fields: FieldsType[],
//   setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>
// ): boolean => {
//   let isValid = true;
//   const fieldName = fields?.map((item: FieldsType) => item?.name);
//   setFields((prev) =>
//     prev.map((field) => {
//       let hasError = false;

//       if (field.required) {
//         if ((field.value === '' || field.value === undefined) && fieldName.includes(field?.name)) {
//           hasError = true;
//           isValid = false;
//         }
//       }

//       return { ...field, error: hasError };
//     })
//   );

//   return isValid;
// };



// utils/formValidate.ts
import { FieldsType } from '@/types/Types';

export const validateFields = (
  fields: FieldsType[],
  setFields: React.Dispatch<React.SetStateAction<FieldsType[]>>
): boolean => {
  let isValid = true;
  
  setFields((prev) =>
    prev.map((field) => {
      let hasError = false;

      if (field.required) {
        const value = field.value;
        if (value === '' || value === undefined || value === null) {
          hasError = true;
          isValid = false;
        }
      }

      return { ...field, error: hasError };
    })
  );

  return isValid;
};