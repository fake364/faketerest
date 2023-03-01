export const NAME_REGEX =
  /^[0-9a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/u;

export const USERNAME_REGEX = /^[a-z0-9]([a-z0-9][.-]?)+[a-z0-9]$/;

export const SPACES_REGEX = /^(\S+$)/g;

export const MAX_LENGTH_FIELDS = {
  firstName: 126,
  lastName: 126,
  username: 64
};
