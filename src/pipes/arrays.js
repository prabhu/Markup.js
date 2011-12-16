/*
 * Get a random entry from an array.
 */
Mark.pipes.rand = function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
};

/*
 * Group an array of objects according to a given property. Returns an array
 * of objects, each having a "key" (string) and "items" (array).
 *
 * Example:
 *
 * {{offices|groupby>state}}
 *     <h1>Offices in {{key}}</h1>
 *     <ul>
 *        {{items}}
 *            <li>{{street}}</li>
 *        {{/items}}
 *     </ul>
 * {{/offices}}
 */
Mark.pipes.groupby = function (arr, prop) {
    var a = [], b = [], i, j, k;

    for (i = 0; i < arr.length; i++) {
        j = arr[i][prop];
        if (a.indexOf(j) === -1) {
            a.push(j);
            b.push({ items:[] });
        }
    }

    for (i = 0; i < arr.length; i++) {
        j = arr[i][prop];
        k = a.indexOf(j);
        b[k].key = j;
        b[k].items.push(arr[i]);
    }

    return b;
};

/*
 * Group an array of objects alphabetically by the given property. Returns
 * an array of objects, each having a "key" (letter of the alphabet) and
 * "items" (an array of objects in alphabetical order).
 *
 * Example:
 *
 * {{contacts|alpha>lastname}}
 *     <h1>{{key}}</h1>
 *     <ul>
 *        {{items}}
 *            <li>{{lastname}}, {{firstname}}</li>
 *        {{/items}}
 *     </ul>
 * {{/contacts}}
 */
Mark.pipes.alpha = function (arr, prop) {
    var a = [], b = "", i, j;

    for (i = 0; i < arr.length; i++) {
        j = arr[i][prop].charAt(0).toUpperCase();

        if (b.indexOf(j) === -1) {
            b += j;
            a[b.indexOf(j)] = { key: j, items: [] };
        }

        a[b.indexOf(j)].items.push(arr[i]);
    }

    for (i = 0; i < a.length; i++) {
        a[i].items.sort(function (a, b) {
            return a[prop] > b[prop] ? 1 : -1;
        });
    }

    return a;
};
