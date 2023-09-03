const app = Vue.createApp({
    data() {
        return {
            message: "hello world",
            showCars: false,
            cars: [
                { id: 0, carname: "car 1", model: "honda", isFav: true, img: "assets/car1.jpg" },
                { id: 1, carname: "car 2", model: "Toyota", isFav: false, img: "assets/car2.jpg" },
                { id: 2, carname: "car 3", model: "Ferrari", isFav: true, img: "assets/car3.jpg" },
            ],
            search: null,
            pageMount: null,
        };
    },
    methods: {
        toggleShowCars() {
            this.showCars = !this.showCars;
        },
    },
    computed: {
        searchCars() {
            if (!this.search) {
                return this.cars;
            }
            const searchTerm = this.search.toLowerCase();
            return this.cars.filter(car => car.carname.toLowerCase().includes(searchTerm));
        },
    },
    mounted() {
        this.pageMount = 'Page is now loaded';
    },
});

app.mount("#app");

/* Computed Explaination
To explain briefly, computed functions in Vue 3 are functions that are automatically re-evaluated whenever 
one of their dependencies changes. This allows you to declaratively specify complex logic in your templates, 
rather than having to manually update values or perform calculations in your code. 
Ex kay Search, every input data requires to update certain data value
*/

/* Mounted Explaination
Loaded already it means upon entering a page this Mounted function is already there.

*/