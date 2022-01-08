module.exports = {
	transform: {
		'\\.[jt]sx?$': 'babel-jest'
	},
	testRegex: '.*\\.(test|spec)\\.[jt]sx?$',
	moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
	snapshotSerializers: ['enzyme-to-json/serializer'],
	setupFilesAfterEnv: ['<rootDir>/setupEnzyme.js']
};
