(function () {

    const dataSocket = new WebSocket('ws://mhg-heattestlab:8989/connect');

    let mhg = document.getElementById('greyBox'),
        mhgCounter = 0;
    let com = document.getElementById('blueBox'),
        comCounter = 0;
    let chng = document.getElementById('yellowBox'),
        chngCounter = 0;
    
    dataSocket.addEventListener('message', (m) => {
        var arg = JSON.parse(m.data);
        new CradleCube(arg.name, arg.state, arg.conType, arg.account, arg.change)
    })

    function CradleCube(name, state, conType, account, change) {
        this.name = name;
        this.state = state;
        this.conType = conType;
        this.account = account;
        this.change = change;
        this.makeCube();
    }

    CradleCube.prototype.makeCube = function () {

        if (this.name.length === 3) {
            var content = document.getElementById('content'),
                cube = document.createElement('div'),
                name = document.createElement('span'),
                state = document.createElement('span'),
                conType = document.createElement('span'),
                loader = document.getElementById('loader'),
                randomNum = Math.floor(Math.random() * 3000);

            if (this.account === '28784') {
                cube.classList.add('managed')
                com.innerText = comCounter++;
            } else {
                cube.classList.remove('managed');
                mhg.innerText = mhgCounter++;
            };

            if (this.change === 'gained'){
            chng.innerText = chngCounter++;
            }

            cube.classList.add('cube');
            (this.change === 'gained') ? cube.classList.add('yellowBorder') : cube.classList.remove('yellowBorder');
            name.innerText = this.name;
            name.classList.add('name');
            state.innerText = this.state;
            (this.state === "online") ? state.classList.add('online') : state.classList.add('offline');
            state.classList.add('state');
            conType.innerText = this.conType;
            conType.classList.add('conType');

            content.appendChild(cube);
            cube.appendChild(name);
            cube.appendChild(state);
            cube.appendChild(conType);

            setTimeout(showCube, randomNum);
            setTimeout(hideCube, (300000 + randomNum));
            setTimeout(function () {
                location.reload();
            }, 303000);

            function showCube() {
                cube.classList.add('animate-forwards');
                loader.classList.add('fade-out');
            }

            function hideCube() {
                cube.classList.remove('animate-forwards');
                cube.classList.add('animate-backwards');
            }
        }
    }
})();
