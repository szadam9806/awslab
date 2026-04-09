var AWS = require('aws-sdk');
AWS.config.loadFromPath('./config.json');

exports.lab = function(request, callback) {
    var ec2 = new AWS.EC2();

    var params = {
        ImageId: 'ami-080254318c2d8932f',
        MinCount: 1,
        MaxCount: 1,
        InstanceType: 't3.micro',
        KeyName: 'lab2-key',
        SecurityGroupIds: ['sg-0a2f4301c1751bbce']
    };

    ec2.runInstances(params, function(err, data) {
        if (err) {
            callback(err);
            return;
        }

        var instanceId = data.Instances[0].InstanceId;

        setTimeout(function() {
            ec2.describeInstances({ InstanceIds: [instanceId] }, function(err2, data2) {
                if (err2) {
                    callback(null, "Instance created: " + instanceId + "<br>But describe failed: " + err2);
                    return;
                }

                var instance = data2.Reservations[0].Instances[0];

                callback(
                    null,
                    "New instance created!<br>" +
                    "InstanceId: " + instance.InstanceId + "<br>" +
                    "State: " + (instance.State ? instance.State.Name : "") + "<br>" +
                    "Private IP: " + (instance.PrivateIpAddress || "") + "<br>" +
                    "Public IP: " + (instance.PublicIpAddress || "") + "<br>" +
                    "Public DNS: " + (instance.PublicDnsName || "")
                );
            });
        }, 8000);
    });
};
