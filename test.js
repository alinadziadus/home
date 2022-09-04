function EaseInOutQuad(t, b, c, d) {
    t /= d/2;
    if (t < 1) return c/2*t*t + b;
    t--;
    return -c/2 * (t*(t-2) - 1) + b;
};

function ApplyHeight(name, value) {
    document.getElementById(name).style.height = value + 'px';
}

function ApplyOpacity(name, value) {
    document.getElementById(name).style.opacity = value;
}

let running_animations = [];
let expanded_elements = [];
let expanded_video_name = '';

function AttemptStartAnimation(name) {
    if (running_animations.includes(name))
    {
        return false;
    }
    else
    {
        running_animations.push(name);
        return true;
    }
}

function ToggleExpansion(name) {
    if (expanded_elements.includes(name))
    {
        expanded_elements.pop(name);
        return false;
    }
    else
    {
        expanded_elements.push(name);
        return true;
    }
}

function AnimateVideoExpand(this_name, this_video) {
    if ('' != expanded_video_name)
    {
        if (this_video != expanded_video_name)
        {
            return;
        }
    }

    if (!AttemptStartAnimation(this_name))
    {
        return;
    }

    let start = Date.now();
    let timer = setInterval(function() {
        let elapsed = Date.now() - start;
        const duration = 600;

        if (duration <= elapsed)
        {
            if (ToggleExpansion(this_name))
            {
                expanded_video_name = this_video;
            }
            else
            {
                expanded_video_name = '';
            }
            running_animations.pop(this_name);
            clearInterval(timer);
            return;
        }

        if (expanded_elements.includes(this_name))
        {
            ApplyHeight(this_name, EaseInOutQuad(elapsed, 500, -500, duration));
            ApplyHeight(this_video, EaseInOutQuad(elapsed, 450, -450, duration));
        }
        else
        {
            ApplyHeight(this_name, EaseInOutQuad(elapsed, 0, 500, duration));
            ApplyHeight(this_video, EaseInOutQuad(elapsed, 0, 450, duration));
        }
    });
}

document.querySelector('.mm_expand').addEventListener('click', function() {
    AnimateVideoExpand('expandable_1', 'video_mm');
});

document.querySelector('.wys_expand').addEventListener('click', function() {
    AnimateVideoExpand('expandable_1', 'video_wys');
});

function Hide(id) {
    document.getElementById(id).style.visibility = "hidden";
}

function Show(id) {
    document.getElementById(id).style.visibility = "visible";
}

document.querySelector('.reb_expand').addEventListener('click', function() {
    const this_name = 'expandable_2';
    if (!AttemptStartAnimation(this_name))
    {
        return;
    }

    let start = Date.now();
    let timer = setInterval(function() {
        let elapsed = Date.now() - start;
        const duration = 600;

        if (duration <= elapsed)
        {
            if (ToggleExpansion(this_name))
            {
                Show('slider_1');
                Show('slider_2');
            }
            else
            {
                Hide('slider_1');
                Hide('slider_2');
                Hide('expandable_ww2_1');
                Hide('expandable_ww2_2');
            }
            running_animations.pop(this_name);
            clearInterval(timer);
            return;
        }

        Show('expandable_ww2_1');
        Show('expandable_ww2_2');

        const size = 1380;

        if (expanded_elements.includes(this_name))
        {
            ApplyHeight(this_name, EaseInOutQuad(elapsed, size, -size, duration));
            ApplyOpacity('expandable_ww2_1', EaseInOutQuad(elapsed, 1.0, -1.0, duration));
            ApplyOpacity('expandable_ww2_2', EaseInOutQuad(elapsed, 1.0, -1.0, duration));
            ApplyOpacity('overview_ww2', EaseInOutQuad(elapsed, 1.0, -1.0, duration));
        }
        else
        {
            ApplyHeight(this_name, EaseInOutQuad(elapsed, 0, size, duration));
            ApplyOpacity('expandable_ww2_1', EaseInOutQuad(elapsed, 0.0, 1.0, duration));
            ApplyOpacity('expandable_ww2_2', EaseInOutQuad(elapsed, 0.0, 1.0, duration));
            ApplyOpacity('overview_ww2', EaseInOutQuad(elapsed, 0.0, 1.0, duration));
        }
    });
});

function slide_1(){
    let slideValue = document.getElementById("slider_1").value;
    document.getElementById("slider_img_1").style.clipPath = "polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)";
    console.log("polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)");
}

function slide_2(){
    let slideValue = document.getElementById("slider_2").value;
    document.getElementById("slider_img_2").style.clipPath = "polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)";
    console.log("polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)");
}
