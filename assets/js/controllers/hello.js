var Greeter = (function () {
    function Greeter(greeting) {
        this.greeting = greeting;
        alert(greeting);
    }
    return Greeter;
})();
;
var greeter = new Greeter("Hello, world!");
//# sourceMappingURL=hello.js.map