const {readFileSync, promises: fsPromises} = require('fs');

async function asyncReadFile() {
    try {
        const contents = await fsPromises.readFile('./input', 'utf-8');

        // Split items by new line
        const items = contents.split(/\r?\n/);
        let groupedNumbers: Array<number[]> = [];
        let group: number[] = [];

        // Group items by empty line and convert to number
        items.forEach((item: string, index: number) => {
            if (item !== '') {
                group.push(+item);
            } else {
                groupedNumbers.push(group);
                group = [];
            }
        });

        return groupedNumbers;

    } catch (err) {
        console.log(err);
    }
}

asyncReadFile().then((groupedNumbers) => {
    // Sum all groups
    const elfCalories = groupedNumbers?.map((group) => {
        return group.reduce((a, b) => a + b, 0);
    });

    // Order by calories
    elfCalories?.sort((a, b) => b - a);

    // PUZZLE 1: Find the largest elf calories
    console.log(elfCalories?.[0]);

    // PUZZLE 2: Get sum of top 3 elfs
    console.log(elfCalories?.slice(0, 3).reduce((a, b) => a + b, 0));
});
