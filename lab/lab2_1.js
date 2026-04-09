var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

exports.lab = function(request, callback) {
    var ec2 = new AWS.EC2();

    ec2.describeInstances({}, function(err, data) {
        if (err) {
            callback(err);
            return;
        }

        var result = [];

        if (data && data.Reservations) {
            data.Reservations.forEach(function(reservation) {
                reservation.Instances.forEach(function(instance) {
                    result.push(
                        "InstanceId: " + instance.InstanceId +
                        "<br>State: " + (instance.State ? instance.State.Name : "") +
                        "<br>Private IP: " + (instance.PrivateIpAddress || "") +
                        "<br>Public IP: " + (instance.PublicIpAddress || "") +
                        "<br>Public DNS: " + (instance.PublicDnsName || "") +
                        "<br>ImageId: " + (instance.ImageId || "") +
                        "<br>InstanceType: " + (instance.InstanceType || "") +
                        "<hr>"
                    );
                });
            });
        }

        callback(null, result.join("<br>"));
    });
};
