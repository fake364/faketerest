export const getParticipantsIdsFromKeys = (
  dialogsKeys: string[],
  myId: number
) => dialogsKeys.map((dialogKey) => getParticipants(dialogKey, myId)).flat();

const getParticipants = (dialogKey: string, myId: number) =>
  dialogKey
    .split(':')
    .slice(1)
    .filter((participant) => participant !== String(myId))
    .map(Number);
